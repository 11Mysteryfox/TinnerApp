import Elysia, { Static, t } from "elysia"
import { _register } from "./accout.type"
import { _pagination, CraetePagination } from "./paginnation.type"

export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    introduction: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.String()),
    created_at: t.Optional(t.String()),
    updated_at: t.Optional(t.String()),
})

export const _user = t.Object({
    ..._profile.properties,
    //follower: profile[]
    //following: profile[]
})

const _userPagination = t.Object({
    ..._pagination.properties,
    username: t.Optional(t.String()),
    min_age: t.Optional(t.Number()),
    max_age: t.Optional(t.Number()),
    looking_for: t.Optional(t.Union([t.Literal('male'), t.Literal('female'), t.Literal('all')]))
})

export const _updateProfile = t.Omit(_profile, ['id', 'username', 'updated_at', 'last_acive', 'age'])
export const _userPaginator = CraetePagination(_user, _userPagination)

export const UserDto = new Elysia().model({
    pagination: t.Optional(_userPagination),
    updateProfile: _updateProfile,
    users: _userPaginator,
    user: _user
})

export type updateProfile = Static<typeof _updateProfile>
export type userPagination = Static<typeof _userPagination>
export type userPaginator = Static<typeof _userPaginator>
export type user = Static<typeof _user>