import React, {useCallback, useState} from "react";
import styled from "styled-components";
import UserRequests from "../api/UserRequests";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, loginFailure, loginStart, loginSuccess, UserAuthState} from "../redux/UserSlice";
import {IUserLogin} from "../types/UserTypes";
import {auth, provider} from "../firebase";
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

type FormValues = {
    name: string;
    email: string;
    password: string;
};


const SignIn = () => {

    const [loginValues, setLoginValues] = useState<IUserLogin>({
        email: "",
        password: ""
    });

    const [signUpValues, setSignUpValues] = useState<FormValues>({
        name: "",
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const selector = useSelector((state: UserAuthState) => state.user);
    
    console.log(selector)
    const handleLoginInputValues = useCallback(async (event: React.ChangeEvent<HTMLInputElement>,value: string)  => {
        setLoginValues((prev) => (
            {...prev, [value]: event.target.value}
        ))
    } , []);

    const handleSignUpInputValues = useCallback(async (event: React.ChangeEvent<HTMLInputElement>,value: string)  => {
        setSignUpValues((prev) => (
            {...prev, [value]: event.target.value}
        ))
    } , [])

    const handleLogin = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // @ts-ignore
        dispatch(fetchLogin(loginValues))

    }, [loginValues]);

    const handleSignUp = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const res = await UserRequests.userCreate(signUpValues)
        console.log(res)
    }, [signUpValues]);

    const clickOnGoogleBtn = useCallback(async () => {
        try {
            dispatch(loginStart())
            signInWithPopup(auth, provider)
                .then(res => {
                    UserRequests.userGoogleAuth({
                        name: res.user.displayName,
                        email: res.user.email,
                        image: res.user.photoURL
                    })
                        .then(res => {
                            dispatch(loginSuccess(res.data))
                        })

                })

        } catch (e) {
            dispatch(loginFailure())
        }
    }, [])
    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to LamaTube</SubTitle>
                <Input placeholder="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleLoginInputValues(event,"email")}/>
                <Input type="password" placeholder="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleLoginInputValues(event,"password")}/>
                <Button onClick={handleLogin}>Sign in</Button>
                <Title>or</Title>
                <button onClick={clickOnGoogleBtn}>Sign In With Google</button>
                <Title>or</Title>
                <Input placeholder="username" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSignUpInputValues(event,"name")}/>
                <Input placeholder="email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSignUpInputValues(event,"email")}/>
                <Input type="password" placeholder="password" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSignUpInputValues(event,"password")}/>
                <Button onClick={handleSignUp}>Sign up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default SignIn;