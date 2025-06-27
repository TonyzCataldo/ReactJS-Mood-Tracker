import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();

  const [nome, setNome] = useState<string | null>(localStorage.getItem("nome"));
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [imagemCarregou, setImagemCarregou] = useState(false);
  const [imagem, setImagem] = useState<string | null>(
    localStorage.getItem("imagem_url")
  );

  useEffect(() => {
    if (!nome || !imagem || !email) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { nome, imagem_url, email } = res.data;

      // salva no localStorage
      localStorage.setItem("nome", nome);
      localStorage.setItem("imagem_url", imagem_url);
      localStorage.setItem("email", email);

      setNome(nome); // ⬅️ atualiza a tela
      setImagem(imagem_url);
      setEmail(email);
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
    }
  };

  if (!nome || !imagem) return null;

  return (
    <div className="pt-8 md:pt-10 flex flex-col items-center">
      <Header
        nome={nome}
        setNome={setNome}
        imagem={imagem}
        setImagem={setImagem}
        imagemCarregou={imagemCarregou}
        setImagemCarregou={setImagemCarregou}
        email={email}
        setEmail={setEmail}
      />

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario_id");
          localStorage.removeItem("nome");
          localStorage.removeItem("imagem_url");

          onLogout();
          navigate("/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default Dashboard;
