function App() {
  return (
    <>
      <form action="http://localhost:5000/api/download" method="POST">
        <input type="text" name="url" />
        <button>다운로드</button>
      </form>
    </>
  );
}

export default App;
