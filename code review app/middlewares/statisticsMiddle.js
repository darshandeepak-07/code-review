const calculateLines = (code) => {
  const codeLine = code.split("\n");
  return codeLine.length;
};

module.exports = { calculateLines };
