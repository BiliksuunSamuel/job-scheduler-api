import { ApiProperty } from '@nestjs/swagger';

export class PagedResultsDto<T> {
  @ApiProperty()
  results: T[];
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  totalPages: number;
}
