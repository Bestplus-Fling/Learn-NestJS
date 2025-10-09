import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, SchemaOptions } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Cat {
  @ApiProperty({
    example: 'test@example.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'testuser',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  name: string;

  @ApiProperty({
    example: '1q2w3e!!',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  password: string;

  @Prop() // default가 required false이므로 지정하지 않음
  imgUrl: string;

  readonly id: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: CatDocument) {
  return {
    id: this._id.toString(),
    email: this.email,
    name: this.name,
  };
});
