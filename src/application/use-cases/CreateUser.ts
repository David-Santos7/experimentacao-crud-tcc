import { randomUUID } from "node:crypto";

import { User } from "../../domain/entities/User.js";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export interface CreateUserInput {
  name: string;
  email: string;
  role: string;
}

export class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const now = new Date();

    const user = new User({
      id: randomUUID(),
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: now,
      updatedAt: now,
    });

    const existingUser = await this.userRepository.findByEmail(
      user.email,
    );

    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }

    return this.userRepository.create(user);
  }
}