import React, {FC, useState} from "react";
import styled, {ThemeProvider} from "styled-components";
import {darkTheme , lightTheme} from "./utils/Theme";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;
const App: FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <Container>
                <BrowserRouter>
                    <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Main>
                        <NavBar/>
                        <Wrapper>
                            <Routes>
                                <Route path="/">
                                    <Route index element={<Home type={"trend"}/>} />
                                    <Route path="trends" element={<Home type={"trend"}/>} />
                                    <Route path='/sub' element={<Home type={"sub"}/>} />
                                    <Route path="signin" element={<SignIn />} />
                                    <Route path="video">
                                        <Route path=":id" element={<Video />} />
                                    </Route>
                                </Route>
                            </Routes>
                        </Wrapper>
                    </Main>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    )
}

export default App;