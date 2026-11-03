# Cellix — gestão para lojas de celular

Sistema por assinatura para várias lojas de celular e assistências técnicas: cada empresa assinante tem seu login, suas filiais e sua equipe, e paga mensalidade por Pix.

## O que tem

- **Várias lojas por empresa**: seletor de loja no topo; dono vê "Todas as lojas" com comparativo
- **PDV + caixa**: venda de aparelhos e acessórios, leitor de código de barras, várias formas de pagamento, crédito parcelado, troco, desconto, recibo impresso e por WhatsApp; abertura, sangria, suprimento e fechamento de caixa com conferência
- **Estoque por IMEI**: cada aparelho com IMEI validado (não deixa repetir), novo/seminovo, bateria, custo e preço
- **Acessórios e peças**: estoque separado por loja, alerta de estoque baixo, entrada de mercadoria
- **Ordem de serviço**: checklist de entrada, senha, orçamento com peças do estoque, status, técnico, sinal, entrega com garantia, via impressa e aviso ao cliente no WhatsApp
- **Seminovos / troca**: avaliação com checklist (iCloud, IMEI, bateria), compra direta ou troca usada como entrada no PDV, termo de procedência para o cliente assinar
- **Transferências entre lojas** com confirmação de recebimento
- **Equipe**: dono, gerente, vendedor e técnico, cada um com login e lojas liberadas
- **Assinatura**: teste grátis, Pix copia e cola com QR Code, aviso de vencimento e bloqueio automático
- **Admin Cellix** (só para você): todas as empresas, quem informou pagamento, botão "Pago +30 dias", bloquear e mudar plano

## Testar agora (modo demonstração)

Abra o `index.html` no navegador. Sem Firebase configurado, ele roda com dados de exemplo salvos só no navegador.

| Login | Senha | Vê |
|---|---|---|
| dono@demo.com | 123456 | tudo |
| vendedor@demo.com | 123456 | PDV, caixa, vendas (só Loja Centro) |
| tecnico@demo.com | 123456 | ordens de serviço |
| admin@cellix.com | 123456 | painel de cobrança |

## Colocar online (Firebase)

1. Crie um projeto em console.firebase.google.com
2. **Authentication** > Começar > ative **E-mail/senha**
3. **Firestore Database** > Criar banco (modo produção, região `southamerica-east1`)
4. **Firestore > Regras**: cole o conteúdo de `firestore.rules` e publique (confira o seu e-mail de admin na linha `isSuper`)
5. **Configurações do projeto** > Seus apps > Web (`</>`) > copie o `firebaseConfig`
6. No `index.html`, em `CONFIG`:
   - cole o objeto em `firebase:`
   - troque `pix.chave` pela sua chave Pix
   - ajuste preços dos `planos`, `diasTeste` e `toleranciaDias` se quiser
7. Crie sua conta de admin: em Authentication > Usuários > Adicionar, use o mesmo e-mail que está em `superadmins`
8. Hospede o `index.html` (Firebase Hosting, Netlify ou GitHub Pages)

As regras do Firestore garantem que uma empresa nunca vê dados de outra e que, com a mensalidade vencida, ninguém consegue gravar nada, mesmo mexendo no código do navegador.

## Versão Windows

Com o Node.js instalado, na pasta do projeto:

```
npm install
npm start        # abre o programa
npm run dist     # gera o instalador em dist/
```

O programa usa o mesmo banco online, então loja, celular e computador ficam sincronizados.

## Como funciona a cobrança

1. A loja cria a conta e ganha 7 dias grátis
2. Faltando 5 dias, aparece o aviso com o Pix
3. O dono paga, clica em "Já paguei" e envia o comprovante no seu WhatsApp
4. No **Admin Cellix** você clica em **Pago +30 dias**
5. Se passar 3 dias do vencimento sem pagar, o sistema bloqueia (os dados continuam guardados)
