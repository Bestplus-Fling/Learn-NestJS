import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '68e505c417cece7c0ce3a3cf',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'testuser',
    description: 'name',
  })
  name: string;
}
