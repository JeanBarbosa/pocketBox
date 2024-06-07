import { Replace } from '@/utils/helpers/Replace';

export interface ProductProps {
  id: string;
  name: string;
  price: string;
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

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
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
}
