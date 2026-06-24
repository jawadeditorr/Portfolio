import { useEffect, useState } from "react";

export function useTyping(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    if (done) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (cleared) {
      setDeleting(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      );
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}
