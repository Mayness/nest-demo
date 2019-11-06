import { Controller, Get, Post, HttpCode, Body, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostArg, GetArg, CatsArg } from './dto/cats.arg';
import { CatsService } from './cats.service';
import { injectCats } from './cats.module';
import { Cats } from './cats.entity';

@ApiBearerAuth()
@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) { // 依赖注入：CatsService，会自动挂载在当前this上
  }
  @Get('hello')
  getHello(@Query() getDto: GetArg): injectCats {
    console.log(getDto);   // curl http://localhost:3000/cats/hello?id=1234  output: { id: '1234' } 类型是object
    // await sleep()
    return this.catsService.getHello();
  }

  @Post('hello')
  @HttpCode(200)
  getPost(@Body() postDto: PostArg): string {
    // console.log(postDto);  // curl -X POST -d 'c=3&a=2' http://localhost:3000/cats/hello      output: { c: '3', a: '2' } 类型是object
    return 'Post request success';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: '上传文件' })
  UploadedFile(@UploadedFile() file: ArrayBuffer): string {
    console.log(file);  // curl -F 'file=@/Users/dengmingyu/Documents/letcode/static/不同路径.png' -v http://localhost:3000/cats/upload
    return 'Upload file success'
  }

  @Get('wrong')
  wrong(): BadRequestException {
    throw new BadRequestException('请求失败')
  }

  @Get('find')
  getCats(@Query() where: CatsArg): Promise<Cats[]> {
    return this.catsService.getCats(where);
  }
}