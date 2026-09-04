const Game = (async () => {

    const request = await fetch('./game.json');
    const gameInfo = await request.json();

    function load(container) {
        
    }

    function _getStats() {
        
    }

    function getResponse() {
        const { profile } = gameInfo;
        const { mistakes, moves } = _getStats();
        const accuracy = _calculateAccuracy(mistakes, moves);

        const memory = accuracy * profile.get("memory");

        const timeExp = gameInfo.timeExp;
        const timeTaken = _getStats().time;

        const focus = accuracy * (timeExp / timeTaken) * profile.get("focus");

        return {
            memory,
            focus
        };
    }

    function _calculateAccuracy(mistakes, total) {
        return (1 - (mistakes / total));
    }

    return {
        load,
        getResponse
    };

})();

export default Game;