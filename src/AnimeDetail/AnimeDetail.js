export default ({data}) => {
    const {attributes} = data;
    const {
        canonicalTitle,
        description
    } = attributes;

    return (
        <div className='anime-detail'>
            <h4>{canonicalTitle}</h4>
            <p>{description} </p>
        </div>
    )
}