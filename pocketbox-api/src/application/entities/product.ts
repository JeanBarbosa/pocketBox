import { Replace } from '@/shared/utils/helpers/Replace';

export interface ProductProps {
  id: string;
  userId: string;
  name: string;
  price: number;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product {
  private props: ProductProps;

  constructor(
    props: Replace<
      ProductProps,
      {
        id?: string;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
  ) {
    this.props = {
      ...props,
      id: props.id ?? undefined,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public set id(id: string) {
    this.props.id = id;
  }

  public get id(): string {
    return this.props.id;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public toJSON(): ProductProps {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
