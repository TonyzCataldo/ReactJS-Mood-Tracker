import profileDefault from "../assets/avatar-placeholder.svg";

import Button from "./Button";

type ProfileForm = {
  handleFinish: (e: React.FormEvent) => void;
  nameRef: React.RefObject<HTMLInputElement | null>;
  fileRef: React.RefObject<HTMLInputElement | null>;
};

const ProfileForm = ({ handleFinish, nameRef, fileRef }: ProfileForm) => {
  const openFile = () => {
    fileRef.current?.click();
  };

  return (
    <form onSubmit={handleFinish} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          className="text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 font-RedditSans"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="border-[1px] py-3 px-4 font-RedditSans placeholder:font-RedditSans border-neutral-300 rounded-[10px] placeholder:text-[1.125rem]/[140%] placeholder:tracking-[-0.019rem] placeholder:text-neutral-600 text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 outline-none focus:border-blue-600"
          id="name"
          type="text"
          placeholder="Jane Appleseed"
          ref={nameRef}
        ></input>
      </div>
      <div className="flex gap-5 mb-2 ">
        <div>
          <img src={profileDefault}></img>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 font-RedditSans"
              htmlFor="profile-image"
            >
              Upload Image
            </label>
            <p className="font-RedditSans text-[0.938rem]/[140%] tracking-[-0.019rem] text-neutral-600">
              Max 250KB, PNG or JPEG
            </p>
            <input
              ref={fileRef}
              className="hidden"
              id="profile-image"
              type="file"
              accept="image/png, image/jpeg"
            ></input>
          </div>
          <button
            type="button"
            className="font-RedditSans text-[1.125rem]/[120%] font-medium text-neutral-900 py-2 px-4 rounded-[8px] border-[1px] border-neutral-300 w-[5.688rem]"
            onClick={openFile}
          >
            Upload
          </button>
        </div>
      </div>
      <Button
        buttonText="Start Tracking"
        py="0.75rem"
        fontSize="1.25rem"
        lineHeight="140%"
        letterSpacing="0"
      />
    </form>
  );
};
export default ProfileForm;
