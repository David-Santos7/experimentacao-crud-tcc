import { User } from "../../domain/entities/User.js";
import { EmailAlreadyExistsError } from "../errors/EmailAlreadyExistsError.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export class UpdateUser {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: UpdateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findById(input.id);

    if (!existingUser) {
      throw new UserNotFoundError();
    }

    const updatedUser = new User({
      id: existingUser.id,

      name:
        input.name !== undefined
          ? input.name
          : existingUser.name,

      email:
        input.email !== undefined
          ? input.email
          : existingUser.email,

      role:
        input.role !== undefined
          ? input.role
          : existingUser.role,

      createdAt: existingUser.createdAt,
      updatedAt: new Date(),
    });

    const userWithSameEmail =
      await this.userRepository.findByEmail(updatedUser.email);

    if (
      userWithSameEmail &&
      userWithSameEmail.id !== existingUser.id
    ) {
      throw new EmailAlreadyExistsError();
    }

    return this.userRepository.update(updatedUser);
  }
}