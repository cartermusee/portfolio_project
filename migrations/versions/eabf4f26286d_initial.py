"""initial

Revision ID: eabf4f26286d
Revises: 
Create Date: 2023-12-06 19:08:48.941355

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eabf4f26286d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('shirts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('shirt_name', sa.String(length=64), nullable=True),
    sa.Column('description', sa.String(length=124), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('img', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('shirts', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_shirts_description'), ['description'], unique=False)
        batch_op.create_index(batch_op.f('ix_shirts_shirt_name'), ['shirt_name'], unique=False)

    op.create_table('shorts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('shorts_name', sa.String(length=64), nullable=True),
    sa.Column('description', sa.String(length=124), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('img', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('shorts', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_shorts_description'), ['description'], unique=False)
        batch_op.create_index(batch_op.f('ix_shorts_shorts_name'), ['shorts_name'], unique=False)

    op.create_table('trousers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trousers_name', sa.String(length=64), nullable=True),
    sa.Column('description', sa.String(length=124), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('img', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('trousers', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_trousers_description'), ['description'], unique=False)
        batch_op.create_index(batch_op.f('ix_trousers_trousers_name'), ['trousers_name'], unique=False)

    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=124), nullable=True),
    sa.Column('image_file', sa.String(length=20), nullable=False),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)
        batch_op.create_index(batch_op.f('ix_user_username'), ['username'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_username'))
        batch_op.drop_index(batch_op.f('ix_user_email'))

    op.drop_table('user')
    with op.batch_alter_table('trousers', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_trousers_trousers_name'))
        batch_op.drop_index(batch_op.f('ix_trousers_description'))

    op.drop_table('trousers')
    with op.batch_alter_table('shorts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_shorts_shorts_name'))
        batch_op.drop_index(batch_op.f('ix_shorts_description'))

    op.drop_table('shorts')
    with op.batch_alter_table('shirts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_shirts_shirt_name'))
        batch_op.drop_index(batch_op.f('ix_shirts_description'))

    op.drop_table('shirts')
    op.drop_table('order')
    # ### end Alembic commands ###