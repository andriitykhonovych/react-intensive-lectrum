// Core
import React from 'react';
import { render, mount } from 'enzyme';

// Copmonents
import { Composer } from './Composer';

const mocks = {
    _createPostAsyncMock: jest.fn(() => Promise.resolve()),
    preventDefaultMock: jest.fn(),
};

const avatar = 'https://www.avatar.com';
const currentUserFirstName = 'Andrey';

const props = {
    _createPostAsync: mocks._createPostAsyncMock,
    currentUserFirstName,
    avatar,
};

const testComment = 'Hello Lectrum!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment: testComment,
};

const result = mount(<Composer { ...props } />);
const markup = render(<Composer { ...props } />);

// Spies
const spies = {
    _updateCommentSpy: jest.spyOn(result.instance(), '_updateComment'),
    _submitCommentSpy: jest.spyOn(result.instance(), '_submitComment'),
    _handleCommentSpy: jest.spyOn(result.instance(), '_handleFormSubmit'),
    _onSubmitCommentOnEnterSpy: jest.spyOn(result.instance(), '_onSubmitCommentOnEnter'),
};

describe('Composer component:', () => {
    describe('should have valid markup elements', () => {
        test('core JSX', () => {
            expect(result.find('section.composer')).toHaveLength(1);
            expect(result.find('form')).toHaveLength(1);
            expect(result.find('textarea')).toHaveLength(1);
            expect(result.find('input')).toHaveLength(1);
            expect(result.find('img')).toHaveLength(1);
        });
    });

    describe('should have valid props', () => {
        test('_createPostAsync should be async function', async () => {
            await expect(
                result.prop('_createPostAsync')(),
            ).resolves.toBeUndefined();
        });

        test('currentUserFirstName should be a string', () => {
            expect(typeof result.prop('currentUserFirstName')).toBe('string');
        });

        test('avatar should be a string', () => {
            expect(typeof result.prop('avatar')).toBe('string');
        });
    });

    describe('should have valid state', () => {
        test('comment should be an empty sting', () => {
            expect(result.state('comment')).toBe('');
        });
    });

    describe('should have core class method as class arrow properties', () => {

        describe('_handleFormSubmit', () => {
            test('should call preventDefault when invoked as onSubmit event handler', () => {
                result.instance()._handleFormSubmit({
                    preventDefault: mocks.preventDefaultMock,
                });

                expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            });

            test('should call this._submitComment', () => {
                expect(spies._handleCommentSpy).toHaveBeenCalledTimes(1);
                jest.clearAllMocks();
            });
        });

        describe('_submitComment', () => {

            afterEach(() => {
                result.setState(initialState);
            });

            test('should do nothing if state.comment property is an empty string', () => {
                result.instance()._submitComment();

                expect(spies._submitCommentSpy).toHaveReturnedWith(null);
                expect(mocks._createPostAsyncMock).not.toHaveBeenCalled();
                expect(result.state()).toEqual(initialState);
            });

            test('should called _createPostAsync with a comment as an argoment and reset state.comment value', () => {
                result.setState({
                    comment: testComment,
                });
                result.instance()._submitComment();

                expect(mocks._createPostAsyncMock).toHaveBeenNthCalledWith(
                    1,
                    testComment,
                );
                expect(result.state()).toEqual(initialState);
            });
        });

        describe('_updateComment', () => {
            test('should update a state.comment value when called event handler', () => {
                result.instance()._updateComment({
                    target: {
                        value: testComment,
                    },
                });
                expect(updatedState).toEqual(updatedState);
                jest.clearAllMocks();
                result.setState(initialState);
            });
        });
    });

    describe('_onSubmitCommentOnEnter', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        test('should call e.peventDefault() and this._submitComment when invoked onKeyPress handler', () => {
            result.instance()._onSubmitCommentOnEnter({
                preventDefault: mocks.preventDefaultMock,
                key: 'Enter',
            });

            expect(mocks.preventDefaultMock).toHaveBeenCalledTimes(1);
            expect(spies._submitCommentSpy).toHaveBeenCalledTimes(1);
        });

        test('should not call e.peventDefault and this._submitComment any other key is pressed ', () => {
            result.instance()._onSubmitCommentOnEnter({
                peventDefault: mocks.preventDefaultMock,
            });

            expect(mocks.preventDefaultMock).not.toHaveBeenCalled();
            expect(spies._submitCommentSpy).not.toHaveBeenCalled();
        });
    });

    describe('should implement core business logic of sending a text content to create post handker', () => {
        test('textarea value should be empty initially', () => {
           expect(result.find('textarea').text()).toBe('');
        });

        test('textarea value should be controlled by component state', () => {
            expect(result.state('comment')).toBe('');
            expect(result.find('textarea').text()).toBe('');

            result.setState({
                comment: testComment,
            });

            expect(result.find('textarea').text()).toBe(testComment);
            result.setState(initialState);
        });

        test('textarea onChange event should trigger this._updateComment handler', () => {
            result.find('textarea').simulate('change', {
                target: {
                    value: testComment,
                },
            });

            expect(spies._updateCommentSpy).toHaveBeenCalledTimes(1);
            expect(result.find('textarea').text()).toBe(testComment);
            expect(result.state()).toEqual(updatedState);
        });
    });

    describe('should render valid marcup depending on passed props', () => {
        test('should contain valid CSS class', () => {
            expect(markup.attr('class')).toBe('composer');
        });

        test('textarea tag should contain valid for placeholder atribut', () => {
            expect(markup.find('textarea').attr('placeholder'))
                .toBe(`what is your mind ${currentUserFirstName}`);
        });

        test('img tag should contain valid value for src attribute', () => {
            expect(markup.find('img').attr('src')).toBe(avatar);
        });

        test('snapshot ', () => {
            expect(markup.html()).toMatchSnapshot();
        });
    });
});
