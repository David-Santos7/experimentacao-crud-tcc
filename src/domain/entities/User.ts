export const USER_ROLES = ["USER", "ADMIN"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserProps {
  name?: string;
  email?: string;
  role?: string;
}

export class DomainValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainValidationError";
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class User {
  private readonly _id: string;
  private _name: string;
  private _email: string;
  private _role: UserRole;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserProps) {
    this._id = props.id;
    this._name = User.validateName(props.name);
    this._email = User.validateEmail(props.email);
    this._role = User.validateRole(props.role);
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get role(): UserRole {
    return this._role;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  update(props: UpdateUserProps, updatedAt: Date): void {
    const name =
      props.name !== undefined
        ? User.validateName(props.name)
        : this._name;

    const email =
      props.email !== undefined
        ? User.validateEmail(props.email)
        : this._email;

    const role =
      props.role !== undefined
        ? User.validateRole(props.role)
        : this._role;

    this._name = name;
    this._email = email;
    this._role = role;
    this._updatedAt = updatedAt;
  }

  private static validateName(name: string): string {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new DomainValidationError("User name is required.");
    }

    return normalizedName;
  }

  private static validateEmail(email: string): string {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new DomainValidationError("User email is required.");
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      throw new DomainValidationError("User email is invalid.");
    }

    return normalizedEmail;
  }

  private static validateRole(role: string): UserRole {
    if (!USER_ROLES.includes(role as UserRole)) {
      throw new DomainValidationError(
        "User role must be USER or ADMIN.",
      );
    }

    return role as UserRole;
  }
}