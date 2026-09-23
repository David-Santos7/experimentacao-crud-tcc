import type { User } from "../../domain/entities/User.js";
import { UserNotFoundError } from "../errors/UserNotFoundError.js";
import type { UserRepository } from "../repositories/UserRepository.js";

export class GetUser {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}