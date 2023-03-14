import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('<===========================>');
    console.log('예외발생');
    console.log('예외내용:', message);
    console.log('예외코드:', status);
    console.log('stack:', exception.stack);
    console.log('<===========================>');
  }
}
