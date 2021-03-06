
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIcon from "../assets/images/google-icon.svg";

import "../style/auth.scss";

import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

export function NewRoom() {

    const { user } = useAuth();

    const [ newRoom , setNewRoom ] = useState('');

    const history = useHistory();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() ===   '') { return; }

        const rootRef = database.ref('rooms');

        const firebaseRoom = await rootRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/rooms/${firebaseRoom.key}`)

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content" >
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom} >

                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                        />

                        <Button type="submit">
                            Criar na sala
                        </Button>

                    </form>

                    <p>Quer entrar em uma sala existente? <Link to="/" >clique aqui</Link></p>

                </div>
            </main>
        </div>
    )
}