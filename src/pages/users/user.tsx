import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackArrow from "../../components/svgs/backArrow";
import SubNavBar from "../../components/ui/subNavbar";
import { getSingleUser } from "../../queries/userQueries";
import { Button } from "../../styled/button";
import { LoadingDots, LoadingWrapper, Spinner } from "../../styled/loader";
import Details from "./details";
import Payments from "./payments";
import UserSubscriptions from "./subscriptions";

const SingleUser = () => {
  const { user_id, type } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = getSingleUser(
    user_id ? user_id : "",
    !!user_id
  );
  const handleType = (type: "details" | "subscriptions" | "payments") => {
    navigate(`/users/${user_id}/${type}`);
  };
  return (
    <Fragment>
      {!user_id || isError ? (
        <div className="align-center" style={{ height: "30vh" }}>
          <h3>Failed to load user data!</h3>
        </div>
      ) : isLoading ? (
        <LoadingWrapper>
          <Spinner type="primary" size="2rem" />
          <LoadingDots color="#f08438">Loading</LoadingDots>
        </LoadingWrapper>
      ) : data && data.user ? (
        <Wrapper>
          <div style={{ padding: "0 1.5rem" }}>
            <Button
              btnType="ghost"
              size="lg"
              style={{ width: "fit-content", padding: "0 1rem" }}
              onClick={() => navigate("/users")}
            >
              <BackArrow size="1.4rem" />
            </Button>
          </div>
          <Header>
            <div className="thumbnail">
              <img src={data.user.picture} />
            </div>
            <div>
              <h2>{data.user.name}</h2>
              <p>
                User ID:&nbsp;&nbsp;
                {data.user.user_id || "-"}
              </p>
            </div>
          </Header>
          <SubNavBar>
            <SubNavBar.Link>
              <a
                onClick={() => handleType("details")}
                className={type === "details" ? "active" : ""}
              >
                Details
              </a>
            </SubNavBar.Link>
            <SubNavBar.Link>
              <a
                onClick={() => handleType("subscriptions")}
                className={type === "subscriptions" ? "active" : ""}
              >
                Subscriptions
              </a>
            </SubNavBar.Link>
            <SubNavBar.Link>
              <a
                onClick={() => handleType("payments")}
                className={type === "payments" ? "active" : ""}
              >
                Payments
              </a>
            </SubNavBar.Link>
          </SubNavBar>
          <Container>
            {type === "details" ? (
              <Details
                user={data.user}
                localUser={data.localUser}
                roles={data.roles}
              />
            ) : type === "subscriptions" ? (
              <UserSubscriptions id={data.user.user_id} />
            ) : type === "payments" ? (
              <Payments id={data.user.user_id} />
            ) : null}
          </Container>
        </Wrapper>
      ) : null}
    </Fragment>
  );
};

export default SingleUser;

const Wrapper = styled.div`
  padding: 2rem 0;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2,
    p {
      margin: 0 0 0.5rem;
    }
  }
  .thumbnail {
    display: flex;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
