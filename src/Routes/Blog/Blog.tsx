import React, { useEffect, useState } from "react";
import {
  RouteDiv,
  BlogPostTitle,
  BackgroundClickBlog,
  HOne,
} from "../../Resources/Components/RouteBox";
import { useUserContext } from "../../Application/SelectLanguage/SelectLanguage";
import axios from "axios";
import {
  formatDate,
  backDomain,
  getVideoEmbedUrl,
  Xp,
  UniversalButtonsDivFlex,
} from "../../Resources/UniversalComponents";
import {
  alwaysBlack,
  alwaysWhite,
  lightGreyColor,
  secondaryColor,
  textSecondaryColorContrast,
} from "../../Styles/Styles";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import {
  DivModal,
  IFrameVideoBlog,
  ImgBlog,
  InternDivModal,
  SpanDisapear,
} from "./Blog.Styled";
import { HeadersProps } from "../../Resources/types.universalInterfaces";
import Helmets from "../../Resources/Helmets";

export function Blog({ headers }: HeadersProps) {
  const { UniversalTexts } = useUserContext();
  // Strings
  const [newTitle, setNewTitle] = useState<string>("");
  const [_id, setID] = useState<string>("");
  const [_StudentId, setStudentId] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newImg, setNewImg] = useState<string>("");
  const [newUrlVideo, setNewUrlVideo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [googleDriveLink, setGoogleDriveLink] = useState<string>("");
  const [permissions, setPermissions] = useState<string>("");
  // Booleans
  const [seeConfirmDelete, setSeeConfirmDelete] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // Loading
  const [posts, setPosts] = useState<any>([
    {
      title: <CircularProgress style={{ color: secondaryColor() }} />,
    },
  ]);

  useEffect(() => {
    let getLoggedUser = JSON.parse(localStorage.getItem("loggedIn") || "");
    fetchData();
    setName(getLoggedUser.name);
    setStudentId(getLoggedUser.id || _StudentId);
    setPermissions(getLoggedUser.permissions);
    setGoogleDriveLink(getLoggedUser.googleDriveLink);
  }, []);

  const handleSeeModal = () => {
    setIsVisible(!isVisible);
    setSeeConfirmDelete(false);
  };
  const handleConfirmDelete = () => {
    setSeeConfirmDelete(!seeConfirmDelete);
  };

  const actualHeaders = headers || {};

  const seeEdition = async (id: string): Promise<void> => {
    handleSeeModal();
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogpost/${id}`, {
        headers: actualHeaders,
      });
      setID(response.data.formattedBlogPost.id);
      setNewTitle(response.data.formattedBlogPost.title);
      setNewUrlVideo(response.data.formattedBlogPost.videoUrl);
      setNewText(response.data.formattedBlogPost.text);
      setNewImg(response.data.formattedBlogPost.img);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const editPost = async (id: string): Promise<void> => {
    try {
      const editedPost = {
        title: newTitle,
        videoUrl: newUrlVideo,
        text: newText,
        img: newImg,
      };
      const response = await axios.put(
        `${backDomain}/api/v1/blogposts/${id}`,
        editedPost,
        { headers: actualHeaders }
      );
      fetchData();
      handleSeeModal();
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
      fetchData();
      handleSeeModal();
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    try {
      const response = await axios.delete(
        `${backDomain}/api/v1/blogposts/${id}`,
        { headers: actualHeaders }
      );
      alert("Post definitivamente excluído");
      handleSeeModal();
      fetchData();
    } catch (error) {
      alert("Erro ao editar post");
      console.error(error);
      handleSeeModal();
      fetchData();
    }
  };

  async function fetchData(): Promise<void> {
    setLoading(true);
    try {
      const response = await axios.get(`${backDomain}/api/v1/blogposts`, {
        headers: actualHeaders,
      });

      setTimeout(() => {
        setPosts(response.data.listOfPosts || posts);
        setLoading(false);
      }, 300);
    } catch (error) {
      console.log(error);
      alert("Erro ao importar posts, faça login novamente");
      window.location.assign("/login");
      setLoading(false);
    }
  }

  return (
    <>
      <RouteDiv>
        <Helmets text="Home Page" />
        <div
          style={{
            margin: "1rem 0.5rem 0 0",
            display: "flex",
            maxWidth: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "1rem",
              maxWidth: "100%",
              gap: "1rem",
            }}
          >
            <i className="fa fa-user " aria-hidden="true" />
            <h2>
              {UniversalTexts.hello}
              {name}!
            </h2>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Tooltip title={UniversalTexts.personalFolder}>
              <Link
                target="_blank"
                style={{
                  maxWidth: "100%",
                  backgroundColor: secondaryColor(),
                  color: textSecondaryColorContrast(),
                  padding: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  textDecoration: "none",
                }}
                to={googleDriveLink}
              >
                <span className="hover-link">
                  <i className="fa fa-folder" aria-hidden="true" />
                  <SpanDisapear>{UniversalTexts.personalFolder}</SpanDisapear>
                </span>
              </Link>
            </Tooltip>
            <Tooltip title={UniversalTexts.talkToTheTeacher}>
              <Link
                target="_blank"
                style={{
                  maxWidth: "100%",
                  backgroundColor: secondaryColor(),
                  color: textSecondaryColorContrast(),
                  padding: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  textDecoration: "none",
                  gap: "5px",
                  alignItems: "center",
                }}
                to="https://wa.me/5511915857807"
              >
                <span className="hover-link">
                  <i
                    style={{ paddingRight: "5px", maxWidth: "100%" }}
                    className="fa fa-whatsapp"
                    aria-hidden="true"
                  />
                  <SpanDisapear>{UniversalTexts.talkToTheTeacher}</SpanDisapear>
                </span>
              </Link>
            </Tooltip>
          </div>
        </div>
        <HOne>{UniversalTexts.mural}</HOne>
        {posts.map((post: any, index: number) => (
          <div
            key={index}
            style={{
              maxWidth: "100%",
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              border: `solid 1px ${lightGreyColor()} `,
              marginBottom: "1rem",
              textDecoration: "none",
            }}
          >
            {post.title && (
              <BlogPostTitle>
                <span
                  style={{
                    maxWidth: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  {!loading && (
                    <button
                      className="button"
                      style={{
                        display: permissions == "superadmin" ? "grid" : "none",
                      }}
                      onClick={() => seeEdition(post._id)}
                    >
                      <i className="fa fa-edit" aria-hidden="true" />
                    </button>
                  )}
                  <h2> {post.title}</h2>
                </span>
                {post.createdAt && (
                  <SpanDisapear>{formatDate(post.createdAt)}</SpanDisapear>
                )}
              </BlogPostTitle>
            )}
            {post.videoUrl ? (
              <IFrameVideoBlog src={getVideoEmbedUrl(post.videoUrl)} />
            ) : post.img ? (
              <ImgBlog src={post.img} alt="logo" />
            ) : null}
            <div
              style={{
                margin: "1rem",
                fontSize: "1.1rem",
                display: "block",
                padding: "1rem",
                backgroundColor: alwaysWhite(),
                color: alwaysBlack(),
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: post.text }} />
            </div>
          </div>
        ))}
      </RouteDiv>
      <DivModal
        className="modal"
        style={{
          display: isVisible ? "block" : "none",
        }}
      >
        <Xp onClick={() => handleSeeModal()}>X</Xp>
        <h2>{UniversalTexts.editPost}</h2>
        <InternDivModal>
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            id="title"
            placeholder="Title"
            type="text"
            className="inputs-style"
          />
          <input
            className="inputs-style"
            value={newUrlVideo}
            onChange={(event) => setNewUrlVideo(event.target.value)}
            id="VideoUrl"
            placeholder="VideoUrl (Youtube/Vimeo)"
            type="text"
          />
          <input
            value={newImg}
            onChange={(event) => setNewImg(event.target.value)}
            id="VideoUrl"
            placeholder="Imagem URL"
            type="text"
            className="inputs-style"
          />
          <textarea
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
            id="Texto"
            placeholder="Texto"
            cols={20}
            rows={10}
            required
            className="inputs-style"
          />
        </InternDivModal>
        <UniversalButtonsDivFlex
          style={{
            display: !seeConfirmDelete ? "flex" : "none",
          }}
        >
          <Button
            style={{
              color: alwaysWhite(),
              backgroundColor: "#ba3c3c",
            }}
            onClick={() => handleConfirmDelete()}
          >
            {UniversalTexts.delete}
          </Button>
          <Button
            style={{
              color: alwaysWhite(),
              backgroundColor: "#194169",
            }}
            onClick={() => handleSeeModal()}
          >
            {UniversalTexts.cancel}
          </Button>
          <Button
            style={{
              color: alwaysWhite(),
              backgroundColor: "#138017",
            }}
            onClick={() => editPost(_id)}
          >
            {UniversalTexts.save}
          </Button>
        </UniversalButtonsDivFlex>
        <div
          style={{
            textAlign: "center",
            margin: "0 auto",
            display: seeConfirmDelete ? "grid" : "none",
          }}
        >
          <p
            style={{
              color: "#ba3c3c",
              paddingTop: "1rem",
              fontWeight: 700,
            }}
          >
            {UniversalTexts.deleteConfirm}
          </p>
          <UniversalButtonsDivFlex>
            <Button
              style={{
                color: alwaysWhite(),
                backgroundColor: "#194169",
              }}
              onClick={() => handleConfirmDelete()}
            >
              {UniversalTexts.no}
            </Button>
            <Button
              style={{
                color: alwaysWhite(),
                backgroundColor: "#ba3c3c",
              }}
              onClick={() => deletePost(_id)}
            >
              {UniversalTexts.yes}
            </Button>
          </UniversalButtonsDivFlex>
        </div>
      </DivModal>
      <BackgroundClickBlog
        onClick={() => handleSeeModal()}
        style={{ display: !isVisible ? "none" : "flex" }}
      />
    </>
  );
}

export default Blog;
