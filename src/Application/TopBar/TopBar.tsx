import React, { FC, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  TopBarContainer,
  TopBarNavigation,
  TopBarNavigationBurger,
  BackgroundClick,
  LogoStyle,
  Hamburguer,
} from "./TopBar.Styled";
import { LogoSVG, SpanHover } from "../../Resources/UniversalComponents";
import { useUserContext } from "../SelectLanguage/SelectLanguage";
import { primaryColor, secondaryColor, alwaysBlack } from "../../Styles/Styles";
import { ItemTopBarProps, LinkItem } from "./TopBarTypes";
import { ArvinButton } from "../../Resources/Components/ItemsLibrary";
import { SpanDisapear } from "../../Routes/Blog/Blog.Styled";

const ItemTopBar: FC<ItemTopBarProps> = ({ title, list }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const isAnyLinkActive = list.some((link) =>
    location.pathname.includes(link.endpoint)
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div style={{ cursor: "pointer" }}>
        <SpanHover
          style={{
            textDecoration: "none",
            color: isAnyLinkActive ? secondaryColor() : alwaysBlack(),
          }}
        >
          {title}
        </SpanHover>
      </div>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "8px",
          display: isHovered ? "grid" : "none",
          textAlign: "left",
          zIndex: 500,
          minWidth: "fit-content",
        }}
      >
        {list.map((link, index) => (
          <NavLink
            key={index}
            style={{
              color: location.pathname.includes(link.endpoint)
                ? secondaryColor()
                : alwaysBlack(),
              cursor: location.pathname.includes(link.endpoint)
                ? "default"
                : "pointer",
              display: link.display,
              textDecoration: "none",
            }}
            to={link.endpoint}
          >
            <SpanHover style={{ textDecoration: "none", whiteSpace: "nowrap" }}>
              {link.title}
            </SpanHover>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export const TopBar: FC = () => {
  const [visible, setVisible] = useState<string>("none");
  const { handleLanguageChange, UniversalTexts } = useUserContext();
  const [permissions, setPermissions] = useState<string>("");
  const [seeItems, setSeeItems] = useState(true);

  const onLoggOut = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("loggedIn");
    window.location.assign("/");
  };

  useEffect(() => {
    const getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "{}");
    setPermissions(getLoggedUser.permissions);
  }, []);

  const toAdm: LinkItem[] = [
    {
      title: "Adm",
      endpoint: "/adm-businessmanagement",
      icon: "cog",
      display: "none",
    },
  ];

  const allLinksForUser = [
    {
      title: "Calendário",
      endpoint: "/my-calendar",
      icon: "calendar",
      display: "block",
    },
    {
      title: "Cursos",
      endpoint: "/cursos",
      icon: "address-book-o",
      display: "block",
    },
    {
      title: "Meu perfil",
      endpoint: "/meu-perfil",
      display: "block",
      icon: "user-o",
    },
  ];

  const handleVisible = () => {
    setVisible(visible === "flex" ? "none" : "flex");
  };
  const location = useLocation();
  const myLogo = LogoSVG(primaryColor(), secondaryColor(), 1);
  return (
    <TopBarContainer>
      <Hamburguer onClick={handleVisible}>☰</Hamburguer>
      <SpanDisapear>
        <Link to="/">
          <LogoStyle
            style={{
              display: seeItems ? "block" : "none",
            }}
          >
            <img
              style={{
                maxWidth: "7rem",
              }}
              src="https://ik.imagekit.io/vjz75qw96/assets/IBRC/logo.png?updatedAt=1687980892018"
              alt=""
            />
          </LogoStyle>
        </Link>
      </SpanDisapear>

      <TopBarNavigationBurger
        onClick={handleVisible}
        style={{ display: visible }}
      >
        <div
          style={{
            display: "grid",
            gap: "3px",
            alignItems: "center",
          }}
        >
          <NavLink
            style={{
              color: location.pathname.includes("home")
                ? secondaryColor()
                : alwaysBlack(),
              textDecoration: "none",
            }}
            to="/"
          >
            <SpanHover
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                fontFamily: "Lato",
                textDecoration: "none",
              }}
            >
              {UniversalTexts.homePage}
            </SpanHover>
          </NavLink>
          {allLinksForUser.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : alwaysBlack(),
                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
                  display: link.display,
                  textDecoration: "none",
                }}
                to={link.endpoint}
              >
                <SpanHover
                  style={{
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    fontFamily: "Lato",
                  }}
                >
                  {link.title}
                </SpanHover>
              </NavLink>
            );
          })}
        </div>
        {seeItems && (
          <div
            style={{
              display: permissions == "superadmin" ? "block" : "none",
            }}
          >
            {toAdm.map((link, index) => {
              return (
                <NavLink
                  style={{
                    color: location.pathname.includes(link.endpoint)
                      ? secondaryColor()
                      : alwaysBlack(),
                    cursor: location.pathname.includes(link.endpoint)
                      ? "default"
                      : "pointer",
                    textDecoration: "none",
                  }}
                  key={index}
                  to={link.endpoint}
                >
                  <SpanHover
                    style={{
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      fontFamily: "Lato",
                    }}
                  >
                    {link.title}
                  </SpanHover>
                </NavLink>
              );
            })}
          </div>
        )}
      </TopBarNavigationBurger>
      <BackgroundClick onClick={handleVisible} style={{ display: visible }} />
      <TopBarNavigation>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "1rem",
          }}
        >
          {allLinksForUser.map((link, index) => {
            return (
              <NavLink
                key={index}
                style={{
                  display: seeItems ? "block" : "none",
                  color: location.pathname.includes(link.endpoint)
                    ? secondaryColor()
                    : alwaysBlack(),
                  cursor: location.pathname.includes(link.endpoint)
                    ? "default"
                    : "pointer",
                  textDecoration: "none",
                }}
                to={link.endpoint}
              >
                <SpanHover>
                  <i className={`fa fa-${link.icon}`} />
                  {link.title}
                </SpanHover>
              </NavLink>
            );
          })}
          {permissions === "superadmin" &&
            seeItems &&
            toAdm.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  style={{
                    color: location.pathname.includes(link.endpoint)
                      ? secondaryColor()
                      : alwaysBlack(),
                    cursor: location.pathname.includes(link.endpoint)
                      ? "default"
                      : "pointer",
                    textDecoration: "none",
                  }}
                  to={link.endpoint}
                >
                  <SpanHover>
                    <i className={`fa fa-${link.icon}`} />
                    {link.title}
                  </SpanHover>
                </NavLink>
              );
            })}
        </div>
      </TopBarNavigation>
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        {" "}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <SpanDisapear>
            <i
              onClick={() => {
                setSeeItems(!seeItems);
              }}
              onMouseOver={() => {
                setSeeItems(true);
              }}
              style={{
                cursor: "pointer",
                display: permissions == "superadmin" ? "block" : "none",
              }}
              className="fa fa-eye"
            />
          </SpanDisapear>
          <SpanDisapear>
            <form
              style={{
                display: seeItems ? "block" : "none",
              }}
            >
              <select
                id="language"
                name="language"
                onChange={(e) => handleLanguageChange(e.target.value)}
                defaultValue="en"
              >
                <option value="en">EN-US</option>
                <option value="pt">PT-BR</option>
              </select>
            </form>
          </SpanDisapear>
          <ArvinButton
            style={{ display: seeItems ? "block" : "none" }}
            onClick={onLoggOut}
          >
            {" "}
            {UniversalTexts.leaveButton}
          </ArvinButton>
        </div>
      </div>
    </TopBarContainer>
  );
};
