define([
    'widgets/brease/common/libs/genericUnitTest/Suites/mSpecUnitTestInit',
    'widgets/brease/common/libs/genericUnitTest/Suites/mSpecUnitTestFunctions',
    'widgets/brease/common/libs/genericUnitTest/TestUtils/GenericUnitTestMatchers',
    'brease/helper/jasmine/MatcherFactory',
    'widgets/brease/common/libs/Test/Jasmine-moduleTest'
], function (
    mSpecUnitTestInit, mSpecUnitTestFunctions, GenericUnitTestMatchers, matcherFactory
) {

    'use strict';

    return {
        suite: function (specParam) {    

            m.describe(specParam.run, 'UnitTest', function () {   
                
                var initRun = (specParam.init && specParam.init.run) ? specParam.init.run : false,
                    functionsRun = (specParam.functions && specParam.functions.run) ? specParam.functions.run : false;

                beforeEach(function () {
                    matcherFactory.addMatchers(this, GenericUnitTestMatchers);
                });
                m.describe(initRun, 'initialization', mSpecUnitTestInit.suite, [specParam]);

                m.describe(functionsRun, 'functions', mSpecUnitTestFunctions.suite, [specParam]);
            });
        }
    };
});
