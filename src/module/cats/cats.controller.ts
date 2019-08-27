import { Controller, Get, Post, HttpCode, Body, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { postDto } from './dto/cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {

  constructor(private readonly catsService: CatsService) { // 依赖注入：CatsService，会自动挂载在当前this上
  }
  @Get('hello')
  async getHello(@Query() getDto): Promise<string> {
    // console.log(getDto);   // curl http://localhost:3000/cats/hello?id=1234  output: { id: '1234' } 类型是object
    // await sleep()
    return this.catsService.getHello();
  }

  @Post('hello')
  @HttpCode(200)
  getPost(@Body() postDto: postDto): string {
    // console.log(postDto);  // curl -X POST -d 'c=3&a=2' http://localhost:3000/cats/hello      output: { c: '3', a: '2' } 类型是object
    return 'Post request success';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  UploadedFile(@UploadedFile() file) {
    console.log(file);  // curl -F 'file=@/Users/dengmingyu/Documents/letcode/static/不同路径.png' -v http://localhost:3000/cats/upload
  }

  @Get('wrong')
  wrong () {
    throw new BadRequestException('请求失败')
  }
}


function sleep() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  })
}