import type { User } from "../../domain/entities/User.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class ListUsers {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
