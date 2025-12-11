import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions: BoardStatus[] = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC,
  ];

  transform(value: unknown): BoardStatus {
    // Check Type of value
    if (typeof value !== 'string') {
      throw new BadRequestException('Status must be a string');
    }

    const upperValue = value.toUpperCase() as BoardStatus;

    if (!this.isStatusValid(upperValue)) {
      throw new BadRequestException(
        `${upperValue} isn't in the status options`,
      );
    }

    return upperValue;
  }

  private isStatusValid(status: BoardStatus): boolean {
    const index = this.StatusOptions.indexOf(status);

    return index !== -1;
  }
}
