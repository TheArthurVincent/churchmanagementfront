import React, { useEffect, useState } from "react";
import {
  HOne,
  RouteDiv,
  RouteSizeControlBox,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import { backDomain, formatDateBr } from "../../Resources/UniversalComponents";
import { alwaysBlack } from "../../Styles/Styles";
import { NavLink } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { User } from "./types.MyProfile";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import Helmets from "../../Resources/Helmets";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { SpanDisapear } from "../Blog/Blog.Styled";

export function MyProfile({ headers }: HeadersProps) {
  const { UniversalTexts } = useUserContext();

  const [user, setUser] = useState<User>({} as User);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const actualHeaders = headers || {};

  const editStudentPassword = async (): Promise<void> => {
    if (newPassword === confirmPassword) {
      setNewPassword(newPassword);
    } else {
      alert("As senhas são diferentes");
      return;
    }

    try {
      const response = await axios.put(
        `${backDomain}/api/v1/studentperspassword/${user.id}`,
        { newPassword },
        { headers: actualHeaders }
      );
      setConfirmPassword("");
      setNewPassword("");
      alert("Senha editada com sucesso!");
    } catch (error) {
      alert("Erro ao editar senha");
    }
  };

  const updateInfo = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backDomain}/api/v1/student/${user.id}`,
        { headers: actualHeaders }
      );
      const userInfo = response.data.formattedStudentData;
      setUser(userInfo);

      const loggedIn = JSON.parse(localStorage.getItem("loggedIn") || "{}");

      Object.keys(userInfo).forEach((key) => {
        if (loggedIn.hasOwnProperty(key)) {
          loggedIn[key] = userInfo[key];
        }
      });

      localStorage.setItem("loggedIn", JSON.stringify(loggedIn));

      setLoading(false);
    } catch (error) {
      console.log("Erro ao atualizar dados");
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLoggedUser: User = JSON.parse(
      localStorage.getItem("loggedIn") || ""
    );
    setUser(getLoggedUser);
  }, []);

  const myProfileList = [
    { title: "Nome", data: user.name + " " + user.lastname },
    { title: "CPF", data: user.doc },
    { title: "Telefone", data: user.phoneNumber },
    { title: "E-mail", data: user.email },
    { title: "Data de nascimento", data: user.dateOfBirth },
  ];

  return (
    <>
      {headers ? (
        <RouteDiv
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          className="smooth"
        >
          <Helmets text="My Profile" />
          <div>
            <ul
              style={{
                display: "grid",
                gap: "5px",
                color: alwaysBlack(),
                padding: "0.2rem",
              }}
            >
              <ArvinButton onClick={updateInfo} color="navy">
                <i className="fa fa-refresh" aria-hidden="true" />
              </ArvinButton>
              {loading ? (
                <CircularProgress />
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div>
                    {myProfileList.map((item: any, index: number) => {
                      return (
                        <li
                          key={index + item}
                          style={{
                            listStyle: "none",
                          }}
                        >
                          <SpanDisapear>
                            <b>{item.title}: </b>
                          </SpanDisapear>
                          {item.link ? (
                            <NavLink to={item.link}>Click here</NavLink>
                          ) : (
                            <span>{item.data}</span>
                          )}
                        </li>
                      );
                    })}
                  </div>
                </div>
              )}
            </ul>
          </div>
          <div>
            <form
              style={{
                display: "grid",
                textAlign: "center",
              }}
            >
              <input
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder={UniversalTexts.newPassword}
                type="password"
              />
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder={UniversalTexts.confirmNewPassword}
                type="password"
              />
              <ArvinButton onClick={() => editStudentPassword()}>
                Salvar
              </ArvinButton>
            </form>
          </div>
        </RouteDiv>
      ) : (
        <RouteDiv>Nenhum usuário logado</RouteDiv>
      )}
    </>
  );
}

export default MyProfile;
