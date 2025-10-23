// src/auth/roles/roles.guard.ts (Versão com Hierarquia)

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// Importe o Role do seu arquivo de definições do Prisma Client
// (O nome do arquivo pode variar dependendo da sua estrutura)
import { Role } from '@prisma/client'; // ⬅️ Assumindo que o enum foi gerado aqui

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Pega as roles exigidas da rota (ex: ['INDUSTRY'])
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      // Se não há roles exigidas (@Roles() ausente), permite o acesso.
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    // 🚨 Assumindo que user.role é um string vindo do token (ex: 'PREFEITURA')

    // 2. Converte a string da role do usuário para o valor numérico do Enum (Ex: 'PREFEITURA' -> 2)
    const userRoleValue = Role[user.role as keyof typeof Role];

    // 3. Verifica se o usuário tem privilégio suficiente
    return requiredRoles.some((requiredRoleName) => {
      // Converte a string da role exigida para o valor numérico (Ex: 'INDUSTRY' -> 1)
      const requiredRoleValue = Role[requiredRoleName as keyof typeof Role];

      // A regra de hierarquia: O valor numérico da role do usuário deve ser
      // MAIOR ou IGUAL ao valor numérico da role exigida.
      return userRoleValue >= requiredRoleValue;
    });
  }
}
