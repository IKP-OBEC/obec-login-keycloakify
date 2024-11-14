import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { tss } from "tss-react/mui";
import {createTheme, ThemeProvider } from "@mui/material/styles";

const Login = lazy(() => import("./pages/Login"));

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

const theme = createTheme({
    palette: {
        // mode: "dark"
        primary: { main: "#595BDB" },
        info: { main: "#575757" },

        background: {
            default: "#EDEDED",
        },
        text: {
            primary: "#595BDB",
            // secondary: "#595BDB"
        }
        // primary: {
        //     main: "#1976d2",
        // },
        // secondary: {
        //     main: "#dc004e",
        // },
    },
});

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <ThemeProvider theme={theme}>
            <KcPageContextualized {...props} />
        </ThemeProvider>
    );
}

export function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const { classes } = useStyles();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const useStyles = tss.create(
    ({ theme }) =>
        ({
            kcHtmlClass: {
                ":root": {
                    // colorScheme: "dark"
                }
            },
            kcBodyClass: {
                backgroundColor: theme.palette.background.default
                // border: "10px solid red"
            }
        }) satisfies { [key in ClassKey]?: unknown }
);

// const classes = {
//     kcHtmlClass: "",
//     kcBodyClass: "",
// } satisfies { [key in ClassKey]?: string };
