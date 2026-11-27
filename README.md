# Fincheck

Fincheck is a personal finance tracker for bank accounts, income, and expenses. It includes a React dashboard and a NestJS API backed by PostgreSQL.

## Demo: record a grocery expense

In a local browser run, I created the fictitious checking account **Demo Checking** with an opening balance of **R$ 500,00**, then recorded **Demo Groceries** as a **R$ 42,50** expense in the **Mercado** category. After reloading the dashboard, the expense was still listed and both the account balance and total balance showed **R$ 457,50**.

![Fincheck dashboard showing the Demo Groceries expense and the R$ 457,50 balance](docs/assets/expense-dashboard.png)

## Prerequisites

- Node.js 24 and npm (the demo used Node.js 24.11.0).
- A local PostgreSQL database. The demo used a standalone PostgreSQL instance. The command below shows the Docker setup.

## Environment variables

| File | Variable | Purpose |
| --- | --- | --- |
| `api/.env` | `DATABASE_URL` | PostgreSQL connection URL for Prisma. |
| `api/.env` | `JWT_SECRET` | Local signing secret. Replace the example placeholder with a generated value. |
| `frontend/.env` | `VITE_API_URL` | API base URL, `http://localhost:5000` for this setup. |

## Run locally

From the repository root, start PostgreSQL. The credentials here are for a disposable local database.

```bash
docker run -d --name fincheck-db -p 127.0.0.1:5432:5432 \
  -e POSTGRES_USER=fincheck -e POSTGRES_PASSWORD=fincheck \
  -e POSTGRES_DB=fincheck postgres:16
```

In the API terminal, copy the example and replace the signing secret in the copy. If you use another database, update `DATABASE_URL` to match.

```bash
cd api
cp .env.example .env
node -e 'console.log(require("node:crypto").randomBytes(32).toString("hex"))'
# Set JWT_SECRET in .env to the generated value.
npm ci
npx --no-install prisma migrate deploy
npx --no-install prisma generate
npm run start:dev
```

In a second terminal, from the repository root:

```bash
cd frontend
cp .env.example .env
npm ci
npm run dev -- --host 127.0.0.1
```

1. Open [the sign-up page](http://127.0.0.1:3000/register) and register a sample user, such as `demo@example.test`.
2. Select **Register a new account**. Enter **500** as the balance, name it **Demo Checking**, select **Checking account**, pick a color, and click **Create**.
3. Open the **+** menu and choose **New Expense**. Enter **42,50** and **Demo Groceries**, select **Mercado** and **Demo Checking**, keep today's date, and click **Create**.
4. Reload the dashboard and check the current month under **Transactions**. Use the eye icon next to **Total balance** to reveal the amounts if they are hidden.

## Attribution

Built during the [JStack](https://jstack.com.br/) course.
