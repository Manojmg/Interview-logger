const Router = require('express-promise-router');

const controller = require('./candidatesController');

module.exports = () => {
    const router = Router({ MergeParams: true });

    router.route('/create').post(controller.createNewCandidate);
    router.route('/list').get(controller.listCandidates);
    router.route('/search/:Id').get(controller.searchByCandidateId);
    router.route('/searchname/:firstName').get(controller.searchByCandidateName)
    router.route('/update/:Id').put(controller.updateCandidate);
    router.route('/delete/:Id').delete(controller.deleteCandidate);
    return router;
}