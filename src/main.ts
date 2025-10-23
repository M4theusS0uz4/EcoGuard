import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Global ValidationPipe com debug extra
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // lança erro se enviar campos extras
      transform: true, // transforma o body em instância do DTO
      exceptionFactory: (errors) => {
        // 🔥 Exibe detalhadamente cada erro de validação
        console.error('💥 Erro de validação:', JSON.stringify(errors, null, 2));
        return new HttpException(
          { message: 'Validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );

  // // 🔹 Middleware global para capturar quaisquer exceções não tratadas
  // app.useGlobalFilters({
  //   catch(exception: any, host) {
  //     console.error('💣 Exceção global capturada:', exception);
  //     throw exception; // deixa o Nest processar normalmente depois
  //   },
  // });

  app.use(morgan(':method :url :status - :response-time ms'));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 EcoGuard API rodando em http://localhost:3000`);
}
bootstrap();
