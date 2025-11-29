"use client"

import { Shield, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"

export function SecuritySettings() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Segurança
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Gerencie as configurações de segurança da sua conta
        </p>
      </div>

      {/* Data Protection */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <CardTitle className="text-slate-900 dark:text-white">
              Proteção de Dados
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Informações sobre proteção e privacidade dos seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Data Protection Info */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                    ✅ Todos os seus dados são criptografados
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Utilizamos criptografia end-to-end (SSL/TLS) para proteger suas informações em trânsito.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Info */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                    ✅ Seus dados são completamente privados
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Nunca compartilhamos seus dados com terceiros sem sua permissão explícita.
                  </p>
                </div>
              </div>
            </div>

            {/* Database Security */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                    ✅ Banco de dados seguro e criptografado
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Todos os dados são armazenados em servidores seguros com backup automático diário.
                  </p>
                </div>
              </div>
            </div>

            {/* Backups */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                    ✅ Backups automáticos e redundantes
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Seus dados são sincronizados em múltiplos locais para garantir disponibilidade.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">
                    ✅ Conformidade com LGPD e GDPR
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Estamos em conformidade total com regulamentações de proteção de dados internacionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-slate-900 dark:text-white">
              Segurança da Conta
            </CardTitle>
          </div>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            Opções para proteger sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Alterar Senha
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Mude sua senha regularmente para manter sua conta segura
              </p>
            </div>
            <Button
              variant="outline"
              className="border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Alterar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Autenticação de Dois Fatores
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Adicione uma camada extra de segurança à sua conta
              </p>
            </div>
            <Button
              variant="outline"
              className="border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Ativar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Sessões Ativas
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Gerencie os dispositivos conectados à sua conta
              </p>
            </div>
            <Button
              variant="outline"
              className="border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Gerenciar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Status */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
        <div className="flex gap-2 items-start">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Status de Segurança: Excelente
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
              Sua conta está bem protegida. Todos os sistemas de segurança estão funcionando corretamente.
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Privacy */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Documentos Legais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="#"
            className="block text-blue-600 dark:text-blue-400 hover:underline"
          >
            📄 Política de Privacidade
          </a>
          <a
            href="#"
            className="block text-blue-600 dark:text-blue-400 hover:underline"
          >
            📋 Termos de Serviço
          </a>
          <a
            href="#"
            className="block text-blue-600 dark:text-blue-400 hover:underline"
          >
            ⚖️ Política de Conformidade LGPD
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
