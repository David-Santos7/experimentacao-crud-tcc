import type { User } from "../../domain/entities/User.js";

export interface UserRepository {
    create(user: User): Promise<User>;

    findById(id: string): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findAll(): Promise<User[]>;

    update(user: User): Promise<User>;

    deleteById(id: string): Promise<boolean>;
}