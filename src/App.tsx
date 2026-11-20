import "./styles/app.css";
import type { Component } from "solid-js";
import { SiteLayout } from "./components/SiteLayout";
import { AppRouter } from "./router";

export interface AppProps {
  readonly url?: string;
}

const App: Component<AppProps> = (props) => {
  return (
    <AppRouter url={props.url}>
      {(sectionProps) => <SiteLayout>{sectionProps.children}</SiteLayout>}
    </AppRouter>
  );
};

export default App;
