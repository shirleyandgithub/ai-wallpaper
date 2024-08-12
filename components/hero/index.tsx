import Input from "../input";





export default function() {
    return (
    <section>
      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-start px-5 pt-16">
        <div className="lg:max-w-[80%]">
          <h1 className="mb-5 text-primary text-4xl font-semibold md:text-8xl lg:mb-7">AI壁纸生成器 </h1>
          <p className="mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">帮你生成好看的壁纸</p>
        </div>
        <div className="flex justify-center">
           
        </div>
        
      </div>
      <Input />

       </section>
    );
}