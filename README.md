# 📱 Projeto Modelo: Agendamento de Reuniões

Este é um aplicativo desenvolvido em **React Native** com o objetivo de servir como exemplo prático para alunos da Estácio na disciplina de **Programação para Dispositivos Móveis (ARA0089)**.  
O app permite o **agendamento de reuniões** e o **cadastro de pessoas**, implementando operações básicas de **CRUD (Create, Read, Update, Delete)**.

## 🧾 Funcionalidades

- Cadastro de pessoas com informações básicas.
- Agendamento de reuniões vinculadas às pessoas cadastradas.
- Listagem, edição e exclusão de registros de pessoas e reuniões.
- Interface simples e intuitiva, focada no aprendizado dos conceitos fundamentais de desenvolvimento mobile.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Context API](https://reactjs.org/docs/context.html) para gerenciamento de estado

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
projetoModelo/
├── assets/                 # Recursos estáticos como imagens e fontes
├── src/
│   ├── components/         # Componentes reutilizáveis da interface
│   ├── context/            # Contextos para gerenciamento de estado
│   ├── navigation/         # Configurações de navegação
│   ├── screens/            # Telas principais do aplicativo
│   └── utils/              # Funções utilitárias
├── App.js                  # Arquivo principal do aplicativo
├── app.json                # Configurações do projeto Expo
└── package.json            # Dependências e scripts do projeto
```

## 🚀 Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/cybermassulo/pdmaEstacio.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd pdmaEstacio/projetoModelo
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o projeto com o Expo:

   ```bash
   npx expo start
   ```

5. Utilize o aplicativo Expo Go em seu dispositivo móvel ou um emulador para visualizar o aplicativo.

## 🎓 Objetivos Educacionais

Este projeto tem como finalidade:

- Proporcionar uma base prática para o entendimento de conceitos de desenvolvimento mobile.
- Demonstrar a implementação de operações CRUD em um aplicativo React Native.
- Servir como referência para a criação de projetos extensionistas na Estácio, conforme as diretrizes da disciplina ARA0089.

## 📌 Observações

- O aplicativo não possui autenticação de usuários; todas as funcionalidades estão disponíveis sem necessidade de login.
- Sinta-se à vontade para personalizar e expandir o projeto conforme suas necessidades e criatividade.
