// Import CSS
import "./App.css";
import HungTipTap from "./components/HungTipTap/HungTipTap";
// import "./components/TipTap/styles.scss";

// import PreviewContent from "./components/HungTipTap/PreviewContent";
// import ContentEditor from "./components/HungTipTap/ContentEditor";
// import CommentEditor from "./components/HungTipTap/CommentEditor";

const App = () => {
  return (
    <>
      <div>
        <h1>Hung TipTap</h1>
        <HungTipTap />
      </div>

      {/* <div>
        <h1>TipTap</h1>
        <TiptapEditor />
      </div> */}

      {/* 
      <div>
        <h1 className="container p-8 ">Novel</h1>
        <NovelEditor />
      </div> */}
    </>
  );
};

export default App;
