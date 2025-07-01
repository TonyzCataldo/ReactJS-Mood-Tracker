import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import DefaultContainer from "../components/DefaultContainer";
import SettingsHeader from "../components/SettingsHeader";
import ProfileForm from "../components/ProfileForm";

const Dashboard = () => {
  const { nome, email, imagem, setNome, setEmail, setImagem } = useAuth();
  const [imagemCarregou, setImagemCarregou] = useState(false);
  const [settingsIsVisible, setSettingsIsVisible] = useState(false);

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
    <div className="pt-8 md:pt-10 pb-20  flex flex-col items-center">
      <Header
        imagemCarregou={imagemCarregou}
        setImagemCarregou={setImagemCarregou}
        setSettingsIsVisible={setSettingsIsVisible}
      />
      <DefaultContainer py={"settings"} settingsIsVisible={settingsIsVisible}>
        <SettingsHeader />
        <ProfileForm />
      </DefaultContainer>
    </div>
  );
};
export default Dashboard;
