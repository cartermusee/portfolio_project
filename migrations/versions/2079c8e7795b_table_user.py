"""table user

Revision ID: 2079c8e7795b
Revises: 5543aa71a702
Create Date: 2023-11-21 13:18:47.850856

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2079c8e7795b'
down_revision = '5543aa71a702'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_user')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('image_file',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('image_file',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    op.create_table('_alembic_tmp_user',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('image_file', sa.VARCHAR(length=20), nullable=False),
    sa.Column('username', sa.VARCHAR(length=64), nullable=True),
    sa.Column('email', sa.VARCHAR(length=124), nullable=True),
    sa.Column('password', sa.VARCHAR(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
