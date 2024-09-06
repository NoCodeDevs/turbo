import "@turbostarter/ui/globals";

import { Main } from "~components/common/main";
import { Layout } from "~components/layout/layout";
import "~styles/globals.css";

const Options = () => {
  return (
    <Layout className="p-8">
      <Main filename="src/newtab" />
    </Layout>
  );
};

export default Options;
