import InfiniteScroll from "./_component/infinite-scroll";
import Uploader from "./_component/uploader";
import WordPullUp from "./_ui/word-pull-up";

export default function Home() {
  return (
    <main className="flex min-h-screen mt-20 justify-between p-24">
      <section className="w-[55%] flex flex-col items-end gap-8">
        <WordPullUp
          className="font-bold text-4xl text-right w-[80%]"
          words={
            "Put on national flag on your avatar, and support your team in EURO 2024 🎉"
          }
        />
        <InfiniteScroll />
      </section>
      <section className="w-[35%]">
        <Uploader />
      </section>
    </main>
  );
}
