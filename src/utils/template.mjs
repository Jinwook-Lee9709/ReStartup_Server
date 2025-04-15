export const handleRequest = async (action, res) => {
    try {
        const result = await action(); // 비동기 작업 실행
        if (result) {
            return res.status(200).json({
                success: true,
                data: result.result, // result를 그대로 응답에 포함
            });
        }
        return res.status(404).json({
            success: false,
        });
    } catch (error) {
        console.error(error); // 에러는 서버 로그에 출력
        return res.status(500).json({
            success: false,
        });
    }
};

export default { handleRequest };