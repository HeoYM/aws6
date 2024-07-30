import React, { useEffect, useState } from 'react';

const MyComponent = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/json')  // 백엔드 API 주소
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // JSON 응답을 파싱
            })
            .then(result => {
                setData(result);
                setLoading(false);  // 로딩 완료
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false);  // 로딩 완료 (에러 상황)
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // 로딩 중 메시지
    }

    if (error) {
        return <div>Error: {error.message}</div>;  // 에러 메시지
    }

    return (
        <div>
            <h1>Data from Backend:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>  {/* JSON 데이터 출력 */}
        </div>
    );
};

export default MyComponent;
