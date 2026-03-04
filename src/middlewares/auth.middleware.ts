import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

// extend request with authenticated user info
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: UserRole;
        [key: string]: any;
    };
}

interface JwtPayload {
    id: string;
    role: UserRole;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// helper to require admin role after authMiddleware
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    if (req.user.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
