export const renderStringToHtml = (content: string) => {
  return <span dangerouslySetInnerHTML={{ __html: content }}></span>;
};
