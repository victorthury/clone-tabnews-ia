import Confetti from "./confetti";

export const revalidate = 60;

const TABNEWS_URL = "https://www.tabnews.com.br";

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?strategy=new&page=1&per_page=1`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) },
    );
    if (!response.ok) return null;
    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const total = await getTotalContents();

  return (
    <main>
      <Confetti />
      <h1>Em Construção</h1>
      <p>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para que trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <p className="total">
        {total === null
          ? "Não foi possível carregar o total de conteúdos agora."
          : `${total.toLocaleString("pt-BR")} conteúdos publicados no TabNews`}
      </p>
      <a href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Visitar o TabNews oficial
      </a>
    </main>
  );
}
